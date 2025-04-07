import Header from "../components/Header";
import CourseCatalog from "../components/CourseCatalog";
import EnrollmentList from "../components/EnrollmentList";
import Footer from "../components/Footer";
import { useState } from "react";

function CoursePage(){
    

  const [refreshFlag, setRefreshFlag] = useState(false);

    // Because both components need to be re-evaluated when a change occurs,
    // set up a flag either can trigger to refresh both.
  const triggerRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };

    
    return(
        <div className="courses-page">
            <Header />
            <div className="content">
                <CourseCatalog refreshFlag={refreshFlag} setRefreshFlag={triggerRefresh}/>
                <EnrollmentList  refreshFlag={refreshFlag} setRefreshFlag={triggerRefresh}/>
            </div>
            <Footer />
        </div>
    )
}

export default CoursePage;