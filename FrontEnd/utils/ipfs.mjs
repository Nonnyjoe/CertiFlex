import { NFTStorage, File } from 'nft.storage'
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhjNDE5NjU3RGJkRTdBYzA2YTBBM2IwQjA2RThlNkU3REI3MmU3NTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MjI2MTE2MTgwNSwibmFtZSI6Ik1ldGFkYXRhIENyZWF0ZSJ9.Rd-9etvKdQPicKsaT2A6YNonD8f-FItu-_BfHrVM6Gk'

async function storeNFT(name, description, image) {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    return nftstorage.store({
        name,
        description,
        image,
    })
}

async function main(username, useraddr, image) {
    const result = await storeNFT(username, useraddr, image)
   return result
}
export default main;