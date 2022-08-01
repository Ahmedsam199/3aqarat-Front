import React from 'react';
import NewPageAttachment from './new';
import EditPageAttachment from './update';

const index = ({ isModalOpen, handleToggleModel, series, refDoctype }) => {
  return (
    <>
      {series ? (
        <EditPageAttachment
          isModalOpen={isModalOpen}
          handleToggleModel={handleToggleModel}
          RefDocType={refDoctype}
          ItemSeries={series}
        />
      ) : (
        <NewPageAttachment
          isModalOpen={isModalOpen}
          handleToggleModel={handleToggleModel}
        />
      )}
    </>
  );
};

export default index;
