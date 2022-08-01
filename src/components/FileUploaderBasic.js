import Uppy from '@uppy/core'
// import thumbnailGenerator from '@uppy/thumbnail-generator'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import { DragDrop } from '@uppy/react'
import '@uppy/status-bar/dist/style.css'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
const FileUploader = ({ setFile, type, title }) => {
  const { t } = useTranslation()
  const uppy = new Uppy({
    meta: { type },
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: [type], },
    autoProceed: true
  })

  // uppy.use(thumbnailGenerator)

  // uppy.on('thumbnail:generated', (file, preview) => {
  //   setImg(preview)
  // })
  uppy.on('complete', (result) => {
    setFile(result.successful[0].data)
  })
  return (
    <Card>
      {!!title &&
        <CardHeader>
          <CardTitle tag='h4'>{t(title)}  </CardTitle>
        </CardHeader>
      }
      <CardBody>
        <DragDrop uppy={uppy} />
      </CardBody>
    </Card >
  )
}

export default FileUploader
