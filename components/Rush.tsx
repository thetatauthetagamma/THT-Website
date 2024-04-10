import React, { useRef, useState } from 'react'
import Image from 'next/image';
import cheveron from 'images/chevron.png'


interface AccordionProps {
  title: React.ReactNode
  content: React.ReactNode
}


export const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [active, setActive] = useState(false)
  const [active1, setActive1] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease')

  const contentSpace = useRef(null)

  function toggleAccordion() {
    setActive((prevState) => !prevState)
    // @ts-ignore
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight + 2}px`)
    setRotate(active ? 'transform duration-700 ease' : 'transform duration-700 ease rotate-180')
  }


  return (
    <div className="flex flex-col pr-6 pl-6 md:pr-40 md:pl-40">

      <button
        className="py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between "
        onClick={toggleAccordion}
      >
        <p className="inline-block text-footnote light font-semibold text-left text-lg md:text-xl "> Members </p>


        <Image
          src={cheveron}
          alt="Chevron icon"
          className={`${rotate} w-2 h-2 z-0`}
        />

      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out border-b-2 border-[#a3000020]"
      >
        <div className="pb-10">{content}</div>

      </div>

    </div>
  )
}

export default Accordion;
