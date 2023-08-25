import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import Image from 'next/image'
import { MdLockOutline} from 'react-icons/md';
import { IoIosCheckmarkCircle} from 'react-icons/io';
import { VerifiedCertificateDetails } from '../../../components/VerifyCertificate';
import clsx from 'clsx';


  
  const Verified = ({data, open}: {data: VerifiedCertificateDetails, open : boolean}) => {

    
    return (
      <div>
        <Modal isOpen={open} onClose={() => {open = false}} size='xl' isCentered >
        <ModalOverlay />
        <ModalContent  height='250px' >
          <ModalCloseButton />
          <ModalBody mt={8}>
             <div className='flex space-x-3 w-[250px] mx-auto'>
                     <MdLockOutline className='w-[18px] h-[23px] text-[#0FA958]' />
                    <h1 className='w-[220px] mx-auto text-[#0FA958]'>Course Certification Verified</h1>
                </div>
                <div className='w-[400px] mx-auto'>
                     <IoIosCheckmarkCircle className='w-[100px] h-[100px] mx-auto mt-[30px] text-[#0FA958]' />   
                <div className={clsx("flex flex-wrap")}>
                  <div>
                    {data.Name}
                  </div>
                  <div>

                    {data.addr}
                  </div>
                  <div>

                    {data.certificateId.toString()}
                  </div>
                  <div>

                    {data.certificateUri}
                  </div>
                  <div>

                  </div>
                  {data.issuedTime}
                </div>
                </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      </div>
    )
  }
  
  export default Verified