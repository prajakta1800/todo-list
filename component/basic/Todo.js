import React, { useEffect, useState } from 'react'
import "./style.css";
//
const getLocalData =()=>{
    const lists=localStorage.getItem("mytodoList")
    if (lists){
        return JSON.parse(lists)
    }
    else{
        return[]
    }
}

const Todo = () => {
    const [inputdata, setInputData] = React.useState("");
    const[items, setItems]= React.useState(getLocalData());
    const [isEditItem, setIsEditItem]=useState("")
    const [toggleButton, setToggleButton]= useState(false)



    const addItem=()=>{
        if (!inputdata){
            alert("fill the data")
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem, name:inputdata}
                    }
                    return curElem

                })
            )
            setInputData("")
        setIsEditItem(null)
        setToggleButton(false)
        }


        



        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputdata,
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }

// edit the items
const editItem=(index)=>{
    const item_todo_edited=items.find((curElem)=>{
        return curElem.id === index;
    })
    setInputData(item_todo_edited.name)
    setIsEditItem(index)
    setToggleButton(true)

}


const deleteItem=(index) =>
    {
const updatedItem =items.filter((curElem)=>{
return curElem.id!==index;
})
setItems(updatedItem)
    }


const removeAll =()=>{
    setItems([])
}







// local storage data 
useEffect(()=>{
    localStorage.setItem("mytodoList", JSON.stringify(items))
}, [items])









  return (
    <>
      
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                {/* <img src='' alt='todologo' /> */}
                <figcaption>Add Your List Here</figcaption>
            </figure>
            <div className='addItems'>
                <input type='text' 
                placeholder='✍ Add Item' 
                    className='form-contrl'
                    value={inputdata}
                    onChange={(event)=> setInputData(event.target.value) }
                />

                {toggleButton ? (
                <i className="fa fa-edit add-btn" onClick={addItem} ></i>)
                :(
                    <i className="fa fa-plus add-btn" onClick={addItem} ></i>
                )}





            </div>
            <div className='showItems'>








            {
                items.map((curElem, index)=>{
                        return (
                            <div className='eachItem' key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className='todo-btn'>
                    <i className="fa fa-edit add-btn" 
                    onClick={()=>editItem(curElem.id)}></i>
                    <i className="fa fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)} ></i>

                    </div>
                </div>


                        )
                })
            }
                










            </div>

            <div className='showItem'><button className='btn effect04' data-sm-link-text="Remove ALL"
            onClick={removeAll}>
              <span>CHECK-LIST</span>  
            </button></div>
        </div>





      </div>
    </>
  )
}

export default Todo
