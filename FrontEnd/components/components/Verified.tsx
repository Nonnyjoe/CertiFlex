import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import Image from 'next/image'
import { MdLockOutline} from 'react-icons/md';
import { IoIosCheckmarkCircle} from 'react-icons/io';
import { VerifiedCertificateDetails } from '../VerifyCertificate';
import clsx from 'clsx';


  
 export const Verified = ({data, open, close}: {data: VerifiedCertificateDetails, open : boolean, close:() => void}) => {

    
    return (
      <div>
        <Modal isOpen={open} onClose={close} size='xl' isCentered >
        <ModalOverlay />
        <ModalContent  height='250px' >
          <ModalCloseButton />
          <ModalBody mt={8}>
             <div className='flex space-x-3 w-[250px] mx-auto'>
                     <MdLockOutline className='w-[18px] h-[23px] text-[#0FA958]' />
                    <h1 className='w-[220px] mx-auto text-[#0FA958]'>Course Certification Verified</h1>
                </div>
                <div className=' mx-auto'>
                     <IoIosCheckmarkCircle className='w-8 h-8 mx-auto mt-[30px] text-[#0FA958]' />   
                <div className={clsx("flex flex-wrap")}>
                  <h2 className='text-4xl font-semibold'>
                    {data.Name}
                  </h2>
                  <p className='text-sm'>
                    {data.addr}
                  </p>
                  <div>
                    {data.certificateId.toString()}
                    {data.certificateUri}
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