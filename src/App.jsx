import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Tours from './components/Tours';

const url = 'https://course-api.com/react-tours-project';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => {
      return tour.id !== id;
    })
    setTours(newTours);
  }

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json()
      setTours(tours);
      // console.log(tours);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTours()
  },[])

  if (isLoading) {
    return (
    <main>
      <Loading />
    </main>)
  }

  if (tours.length === 0) {
    return <main>
      <div className='title'>
        <h2>no tours left</h2>
        <button type='button' style={{marginTop: '2rem'}} className='btn'
        onClick={() => fetchTours()}>refresh</button>
      </div>
    </main>
  }

  return <main>
    <Tours tours={tours} removeTour={removeTour} />
    <button className='btn' onClick={() =>setTours([])}>Remove all tours</button>
  </main>
}

export default App
