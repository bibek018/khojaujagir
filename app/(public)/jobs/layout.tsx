import { Footer } from "@/components/landing/footer"
import Header from "@/components/landing/header"
export default function  JobLayout ({children}:{children:React.ReactNode}) {
    return(
        <div >
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}