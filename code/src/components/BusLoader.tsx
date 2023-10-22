import "../styles/BusLoader.css"

const BusLoader = () => {
    return (
        <div className='bus-loader'>
            <div className='bus-img'>
              <img src='/bus.png' alt='bus' width="100"/>
              <span>Loading...</span>
            </div>
        </div>
    )
}

export default BusLoader;