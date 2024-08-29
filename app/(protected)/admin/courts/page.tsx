import { getAllCourts } from "@/actions/courts"
import { CourtActionArea } from "./_components/CourtActionArea"
import { AdminCourts } from "./_components/AdminCourts"
import { Court } from "@prisma/client"
import { CourtWithAllRecords } from "@/typings"


const CourtPage = async () => {

  // @ts-ignore
  const courts = await getAllCourts() as CourtWithAllRecords[]
  return (
    <div className=' flex flex-col'>
      <div className=" w-full max-w-6xl mx-auto py-4">
        <CourtActionArea />
      </div>
      <div className="max-w-6xl mx-auto w-full px-6 md:px-0">
        <AdminCourts courts={courts} />
      </div>
    </div>
  )
}

export default CourtPage