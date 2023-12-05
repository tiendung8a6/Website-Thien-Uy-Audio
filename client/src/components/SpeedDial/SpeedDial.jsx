import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import SaveIcon from '@mui/icons-material/Save';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useHistory } from "react-router-dom";

const actions = [
    { link: "https://www.facebook.com/thietkedankaraoke", icon: <FacebookOutlinedIcon />, name: 'Facebook', },
    { link: "/shop", icon: <SaveIcon />, name: 'Sản phẩm' },
    { link: "/", icon: <AttachEmailOutlinedIcon />, name: 'Email' },
    { link: "/", icon: <LocalPhoneOutlinedIcon />, name: 'Phone' },
];

export default function SpeedDialTooltipOpen() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const history = useHistory();

    const handleActionClick = (action) => {
        // history.push(action.link);
        window.location.replace(action.link);

        handleClose();
        window.location.reload();
    };

    return (
        <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }} style={{ position: 'fixed', bottom: '10px', right: '20px', zIndex: '10', background: 'red' }} >
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16, }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}

            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => handleActionClick(action)}
                        components={<a></a>}
                        
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
