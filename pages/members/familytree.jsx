import * as d3 from 'd3'
import supabase from '../../supabase'
import React, { useState, useEffect, useRef } from 'react'
import Tree from 'react-d3-tree'
import BroNavBar from '@/components/BroNavBar'
import Cookies from 'js-cookie'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  SearchIcon,
  Input,
  Tooltip
} from '@nextui-org/react'
import { InfoIcon } from '@nextui-org/shared-icons'

function expand (d) {
  if (d._children) {
    d.children = d._children
    d._children = null
  }
  var children = d.children ? d.children : d._children
  if (children) children.forEach(item => expand(item))
}
function collapse (d, lineage) {
  if (d.children) {
    if (lineage.includes(d.id)) {
      d.children.forEach(item => collapse(item, lineage))
    } else {
      d._children = d.children
      d._children.forEach(item => collapse(item, lineage))
      d.children = null
    }
  }
}

function expandAll (root) {
  expand(root)
}

function collapseAll (root, lineage) {
  collapse(root, lineage)
}

export default function OrgChartTree () {
  const [treeDimensions, setTreeDimensions] = useState({ x: 0, y: 0 })
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const treeRef = useRef(null)

  const [pairingData, setPairingData] = useState(null)
  const [nameData, setNameData] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [treeAction, setTreeAction] = useState(null)
  const [treeKey, setTreeKey] = useState(0)
  const [change, setChange] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchNode, setSearchNode] = useState(null)
  const [lineage, setLineage] = useState([])
  const [lineageView, setLineageView] = useState(false)
  const [isPledge, setIsPledge] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  useEffect(() => {
    const checkIfBrother = async () => {
      setUserEmail(Cookies.get('userEmail'))
      const { data, error } = await supabase
        .from('Brothers')
        .select('*')
        .eq('email', userEmail)
      if (data?.length == 1 && !error) {
        setIsPledge(false)
      }
    }
    const checkIfPledge = async () => {
      const { data, error } = await supabase
        .from('Pledges')
        .select('*')
        .eq('email', userEmail)
      if (data?.length == 1 && !error) {
        setIsPledge(true)
      }
    }

    checkIfBrother()
    checkIfPledge()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('BigLittlePairings')
        .select('*')

      if (error) {
        console.error('Error fetching data:', error)
      } else {
        setPairingData(data)
      }
    }
    const fetchData2 = async () => {
      const { data, error } = await supabase.from('Brothers').select('*')

      if (error) {
        console.error('Error fetching data:', error)
      } else {
        setNameData(data)
      }
    }

    fetchData()
    fetchData2()
  }, [])

  useEffect(() => {
    if (pairingData !== null) {
      let tempData = pairingData
      tempData = tempData.map(item => {
        if (item.biguserid === null) {
          return { ...item, biguserid: 'Theta Gamma' }
        } else {
          return item
        }
      })
      tempData = tempData.map(item => {
        let found_little = nameData.find(el => el.userid === item.littleuserid)
        let found_big = nameData.find(el => el.userid === item.biguserid)
        if (found_big === undefined) {
          return {
            ...item,
            littleuserid: found_little.firstname + ' ' + found_little.lastname
          }
        } else {
          return {
            ...item,
            littleuserid: found_little.firstname + ' ' + found_little.lastname,
            biguserid: found_big.firstname + ' ' + found_big.lastname
          }
        }
      })
      tempData = [...tempData, { biguserid: '', littleuserid: 'Theta Gamma' }]

      const root = d3
        .stratify()
        .id(d => d.littleuserid)
        .parentId(d => d.biguserid)(tempData)

      setChartData(root)
      console.log(root)
      console.log(tempData)
      console.log('NAMEDATA', nameData)
    }
  }, [nameData])
  useEffect(() => {
    let { width, height } = treeRef.current.getBoundingClientRect()

    setTreeDimensions({ x: width, y: height })
    setTranslate({ x: width / 2, y: height / 4 })
  }, [treeRef.current])
  useEffect(() => {
    console.log(treeAction)
    let root = chartData
    if (treeAction !== null) {
      if (treeAction == 1) {
        expandAll(root)
      } else {
        collapseAll(root)
      }
    }
    console.log(root)
    setChartData(root)
    setTreeKey(treeKey + 1)
  }, [change])
  function handleExpand (key) {
    setTreeAction(key)
    setChange(!change)
  }
  function findLineage (node, acc = []) {
    if (!node) return []
    const newAcc = [node.id, ...acc]
    if (node.parent) {
      return findLineage(node.parent, newAcc)
    } else {
      return newAcc
    }
  }
  function search (e) {
    e.preventDefault()
    setLineage(null)
    if (chartData && searchQuery) {
      const foundNode = chartData.find(node => node.id == searchQuery)
      const lineageIds = findLineage(foundNode)
      setLineage(lineageIds)
      console.log('Lineage', lineage)
      if (foundNode) {
        setSearchNode(searchQuery)
      } else {
        setSearchNode(null)
      }
    }
  }
  function handleLineageView (e) {
    setLineageView(!lineageView)
  }
  useEffect(() => {
    let root = chartData
    if (chartData != null) {
      if (lineageView) {
        collapseAll(root, lineage)
      } else {
        expandAll(root)
      }
      setChartData(root)
      setTreeKey(treeKey + 1)
    }
  }, [lineageView])
  const RenderRectSvgNode = ({ nodeDatum, toggleNode }) => {
    let words = nodeDatum.id.split(' ')
    let hightlighted = searchNode === nodeDatum.id
    let inLineage = lineage ? lineage.includes(nodeDatum.id) : false
    return (
      <g onClick={toggleNode}>
        <circle
          fill={hightlighted ? 'maroon' : 'gold'}
          stroke={hightlighted ? 'gold' : 'maroon'}
          x='0'
          y='0'
          r='60'
        />
        {words.map((word, index) => (
          <text
            key={index}
            fill={hightlighted ? 'gold' : 'maroon'}
            stroke={hightlighted ? 'gold' : 'maroon'}
            strokeWidth='1'
            textAnchor='middle'
            x='0' // Center horizontally
            y={-6 + index * 20} // Adjust starting position and line spacing
            style={{
              fontFamily: 'Montserrat, sans-serif', // Specify the font family
              fontSize: '20px' // Specify the font size
            }}
          >
            {word}
          </text>
        ))}
      </g>
    )
  }

  const containerStyle = {
    height: '100vh',
    width: '100vw',
    overflow: 'auto'
  }

  return (
    <div className='flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]'>
      {isPledge ? (
        <BroNavBar isPledge={true} />
      ) : (
        <BroNavBar isPledge={false} />
      )}
      <div className=''>
        <div className='flex justify-center items-center h-16'>
          <h1 className='text-red-700 text-2xl font-bold'>
            Theta Gamma Family Tree
          </h1>
        </div>
        <p>Search a name to highlight it. Check the box to trace lineage.</p>
        <div className='flex items-center space-x-2'>
          <form
            className='flex flex-row items-center'
            onSubmit={e => search(e)}
          >
            <input
              className='border border-yellow-500 p-1 rounded-md text-sm focus:outline-none focus:border-yellow-600 bg-yellow-50 placeholder-yellow-700'
              type='text'
              name='query'
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Search Node'
            />
            <button
              className='bg-red-700 hover:bg-red-800 text-yellow-300 font-semibold py-1 px-3 rounded text-sm'
              type='submit'
            >
              Search
            </button>
          </form>
          <button
            onClick={() => handleExpand(1)}
            className='bg-red-700 hover:bg-red-800 text-yellow-300 font-semibold py-1 px-3 rounded text-sm'
          >
            Expand All
          </button>
          <label className='flex items-center space-x-2'>
            <span>Lineage View</span>
            <input
              type='checkbox'
              checked={lineageView}
              onChange={e => handleLineageView(e.target.checked)}
            />
          </label>
        </div>
        <div ref={treeRef} style={containerStyle}>
          {chartData && (
            <Tree
              key={treeKey}
              data={chartData}
              translate={translate}
              orientation='vertical'
              renderCustomNodeElement={RenderRectSvgNode}
              zoomable={true}
              zoom={0.1}
              draggable={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}
