import React, { useEffect, useState } from 'react'
import BroNavBar from '@/components/BroNavBar'
import ClassMemberTile from '@/components/ClassMemberTile'
import supabase from '../../supabase'
import Cookies from 'js-cookie'

export default function StudyBuddySearch () {
  const [searchQuery, setSearchQuery] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isPledge, setIsPledge] = useState(true)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const membersPerPage = 8

  useEffect(() => {
    setUserEmail(Cookies.get('userEmail'))
    const fetchData = async () => {
      try {
        const [pledgeData, brothersData] = await Promise.all([
          supabase.from('Pledges').select('*'),
          supabase.from('Brothers').select('*')
        ])

        let combinedMembers = []

        if (!(pledgeData.data?.length === 0) && !pledgeData.error) {
          const sortedPledges = pledgeData.data.sort(
            (a, b) => b.lastname - a.lastname
          )
          console.log(sortedPledges)
          combinedMembers.push(...sortedPledges)
        }

        if (brothersData.error) {
          throw brothersData.error
        }

        if (brothersData.data) {
          
          const sortedData = brothersData.data.sort((a, b) => b.roll - a.roll)
          console.log(sortedData)
          combinedMembers.push(...sortedData)
        }

        setMembers(combinedMembers)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userEmail])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    const checkIfBrother = async () => {
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
  }, [userEmail])

  const filteredMembers = members.filter(member => {
    if (member.classes && member.classes.length > 0) {
      const normalizedQuery = searchQuery.toLowerCase()
      return member.classes.some(className =>
        className.toLowerCase().includes(normalizedQuery)
      )
    }
    return false
  })

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage)

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
  }

  const indexOfLastMember = currentPage * membersPerPage
  const indexOfFirstMember = indexOfLastMember - membersPerPage
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  )

  if (loading) {
    return null
  }

  return (
    <div className='flex md:flex-row flex-col flex-grow border-b-2 border-[#a3000020]'>
      {isPledge ? (
        <BroNavBar isPledge={true} />
      ) : (
        <BroNavBar isPledge={false} />
      )}
      <div className='flex-grow'>
        <div className='flex-grow h-full m-4'>
          <h1 className='font-bold text-4xl xs:max-sm:text-center pb-4'>
            Find Study Buddies
          </h1>
          <input
            type='text'
            placeholder='Search by class name and number (EECS 482, MECHENG 211, AEROSP 200)'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='p-2 border border-gray-800 rounded w-full mb-4'
          />
          <div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'
            style={{ maxHeight: '550px', overflowY: 'auto' }}
          >
            {currentMembers.map(member => (
              <div key={member.userid ? member.userid : member.uniqname}>
                <ClassMemberTile
                  userid={member.userid ? member.userid : member.uniqname}
                  firstname={member.firstname}
                  lastname={member.lastname}
                  email={member.email}
                  phone={member.phone}
                />
              </div>
            ))}
          </div>
          <div className='flex justify-between mt-4'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &larr; Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &rarr; Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
