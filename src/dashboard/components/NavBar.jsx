import { Fragment } from "react";

const NavBar = () =>{
    return(
        <Fragment>
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center pt-3" style={{fontWeight:'bold'}}>
                    <p className="ps-3">LOREMIPSUM</p>
                    <p className="pe-3" >Dashboard</p>
                </div>
            </div>
        </Fragment>
    )
}

export default NavBar;