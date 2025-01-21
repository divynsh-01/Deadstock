import React, { useState } from 'react';
import logo from "../../images/logoHead.png";
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import "./SideBar.css"

const SideBar = () => {
    const [openProducts, setOpenProducts] = useState(false);

    const handleProductsClick = () => {
        setOpenProducts(!openProducts);
    };

    return (
        <div className="sideBar">
            <Link to="/">
                <img src={logo} alt="DeadStock" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon style={{marginRight: "6.5px"}}/> Dashboard
                </p>
            </Link>

            <List>
                {/* Products Section */}
                <ListItem button style={{cursor:"pointer"}} onClick={handleProductsClick}>
                    <ListItemIcon style={{marginRight: "-25px"}}>
                        <ImportExportIcon className='impexp'/>
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                    {openProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>

                <Collapse in={openProducts} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link to="/admin/products">
                            <ListItem button>
                                <ListItemIcon>
                                    <PostAddIcon className='impexp'/>
                                </ListItemIcon>
                                <ListItemText primary="All" />
                            </ListItem>
                        </Link>
                        <Link to="/admin/product">
                            <ListItem button>
                                <ListItemIcon>
                                    <AddIcon className='impexp' />
                                </ListItemIcon>
                                <ListItemText primary="Create" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
            </List>

            {/* Orders Section */}
            <Link to='/admin/orders'>
                <p><ListAltIcon style={{marginRight: "6.5px"}} />
                    Orders</p>
            </Link>

            {/* Users Section */}
            <Link to='/admin/users'>
                <p><PeopleIcon style={{marginRight: "6.5px"}}/>
                    Users</p>
            </Link>

            {/* Reviews Section */}
            <Link to='/admin/reviews'>
                <p><RateReviewIcon style={{marginRight: "6.5px"}}/>
                    Reviews</p>
            </Link>
        </div>
    );
};

export default SideBar;
