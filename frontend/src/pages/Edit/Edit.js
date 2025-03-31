import './Edit.scss';
import { API_URL } from '../../utils/constants';
import AddOneSoundForm from '../../components/AddOneSoundForm/AddOneSoundForm';
import AddOneCategoryForm from '../../components/AddOneCategoryForm/AddOneCategoryForm'
import React, { useState, useContext, useEffect } from 'react'
import { LibrariesContext } from '../../utils/LibrariesContext'

function Edit() {
  
  const { sounds, categories } = useContext(LibrariesContext);

  return (
    <div className="edit">
      <div className="edit_container">
        <AddOneSoundForm categories={categories}/>
        <AddOneCategoryForm/>
      </div>
    </div>
  );
}

export default Edit;
