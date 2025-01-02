import { getAllUsers } from '@/data/user'
import { GenericUser } from '@/typings'
import { MinistryUserActionArea } from './_components/MinistryUserActionArea'


const AdminCasePage = async () => {


const users = await getAllUsers() as unknown as GenericUser[]

  return (
    <div className='flex bg-white dark:bg-dark-bg'>
        <MinistryUserActionArea users={users} />
    </div>
    )
}

export default AdminCasePage