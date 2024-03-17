import { ROUTER } from '../../config'

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <a href={ROUTER.message}>Message</a>
    </div>
  )
}

export default Home
