
import React, { useState } from 'react';
import CategoryManagement from '../pages/categoryManagement';
import QuestionManagement from '../pages/QuestionManagement';

const Management = () => {
  
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div>
       {/* Render CategoryManagement */}
      <CategoryManagement onSelectCategory={(id) => setSelectedCategoryId(id)} />

      {/* Render QuestionManagement */}
      {selectedCategoryId ? (
        <QuestionManagement categoryId={selectedCategoryId} />
      ) : (
        <p>Please select a category to manage questions.</p>
      )}
    </div>
  );
};

export default Management;
