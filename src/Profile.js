import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from './store';

const Profile = () => {
  const [luckyNumber, setLuckyNumber] = useState(7);
  const { auth, notes } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const userNotes = notes.data.filter(note => note.userId === auth.id)

  useEffect(()=> {
    if(auth.id){
      setLuckyNumber(auth.luckyNumber);
    }
  }, [auth]);

  const _update = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ luckyNumber }));
  };

  if (!userNotes) {
    return null
  }

  return (
    <div>
      <ul>
        {
          userNotes.length && userNotes.map(note => {
            return (
              <li key= {note.id}>
                {note.title} : {note.content}
              </li>
            )
          })
        } 
      </ul>
      <form onSubmit={ _update }>
        <input placeholder='luckyNumber' value={ luckyNumber } onChange={ ev => setLuckyNumber(ev.target.value)}/>
        <button disabled={ luckyNumber === auth.luckyNumber }>Update</button>
      </form>
    </div>
  );
};

export default Profile;
