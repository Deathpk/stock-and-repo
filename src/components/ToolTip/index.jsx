import React from "react"

export default function ToolTip({ label, message, icon }) {
  return (
    <>
      {/*      <!-- Component: Right base sized tooltip --> */}
      <span
        className="relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none"
        aria-describedby="tooltip-03"
      >
        {/*        <!-- Tooltip trigger --> */}
        <div className="flex items-center">
            { label } <i>{ icon }</i>
        </div>
        {/*        <!-- End Tooltip trigger --> */}
        <span
          role="tooltip"
          id="tooltip-03"
          className="invisible absolute left-full top-1/2 z-10 ml-2 w-48 -translate-y-1/2 rounded bg-slate-700 p-4 text-sm text-white opacity-0 transition-all before:invisible before:absolute before:top-1/2 before:right-full before:z-10 before:ml-2 before:-mt-2 before:border-y-8 before:border-r-8 before:border-y-transparent before:border-r-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100"
        >
            { message }
        </span>
      </span>
      {/*      <!-- End Right base sized tooltip --> */}
    </>
  )
}