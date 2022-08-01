import React, { useState } from 'react'
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Row,
  Col, Button
} from 'reactstrap'
import FileUploaderBasic from '@componentsLocal/FileUploaderBasic'
import { bytesToSize } from '@utils'

const ImportFile = ({ importModal, ImportToggle, process }) => {
  const [excelFile, setExcelFile] = useState(null)
  // ! help for excel

  return (
    <Modal isOpen={importModal} toggle={ImportToggle} className='modal-dialog-centered modal-lg'>
      <ModalHeader toggle={ImportToggle}>Vertically Centered</ModalHeader>
      <ModalBody>
        <Row>
          <Col sm="12">
            <FileUploaderBasic setExcelFile={setExcelFile} title="hello" type=".xlsx" />

            {!!excelFile &&

              <h4 className="text-center">{excelFile.name.split(".")[0]} -{' '}{bytesToSize(excelFile.size)}</h4>}
          </Col>

        </Row>
        {/* <input type="file" accept=".xlsx" onChange={(e) => { setExcelFile(e.target.files[0]) }} /> */}
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={async () => {
          process(excelFile)
        }} disabled={!excelFile}>
          send
        </Button>{' '}
      </ModalFooter>
    </Modal>
  )
}
export default ImportFile;
