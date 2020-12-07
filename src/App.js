import React, { useEffect, useState } from 'react'
import './App.css';
import { dummyImg } from './imports'

function App() {
  const numOfImg = 20
  const [imgs, setImgs] = useState([])
  const [startId, setStartId] = useState(null)
  const [startIndex, setStartIndex] = useState(null)
  const [endId, setEndId] = useState(null)

  useEffect(() => {
    const allImg = []
    for (let i = 0; i < numOfImg; i++) {
      allImg.push({ id: i, url: dummyImg })
    }
    setImgs(allImg)
  }, [setImgs])

  const handleMouseOver = ({ e, id }) => {
    const updatedImgs = [...imgs]

    updatedImgs.forEach((updatedImg, index) => {
      if (startId) {
        if (id >= startId) {
          if (updatedImg.id === id) {
            for(let j=startIndex; j<=index; j++) {
              updatedImgs[j]['isActive'] = true
            }
          }
        }
      } else if(!endId) {
        if (updatedImg.id === id) {
          updatedImg['isActive'] = true
        } else {
          if (updatedImg.hasOwnProperty('isActive')) {
            updatedImg['isActive'] = false
          }
        }
      }
    })
    setImgs(updatedImgs)
  }

  const handleClick = ({ e, id, index }) => {
    if(startId) {
      if(id >= startId) {
        setEndId(id)
        setStartId(null)
        setStartIndex(null)
      }
    } else {
      setStartId(id)
      setStartIndex(index)
      setEndId(null)
    }
  }

  return (
    <div className="App">
      {
        imgs.map((ele, index) => (
          <div
            className={["dummy-img"].join(' ')}
            style={{ backgroundImage: `url(${ele.url})` }}
            key={ele.id}
            onMouseOver={(e) => handleMouseOver({ id: ele.id, e })}
            onClick={(e) => handleClick({ e, id: ele.id, index })}
          >
            <div className={[ele.isActive && 'active-img'].join(' ')}></div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
