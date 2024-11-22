"use client";

import { Box, Collapse, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { useState } from "react";


const MenuBar = ({ pages, onClose }) => {
  const [openPage, setOpenPage] = useState(null);

  const handlePageClick = (page) => {
    setOpenPage(openPage === page ? null : page);
  };


  return (
    <Box>
      <List>
        {pages.map((page) => (
          <Box key={page.title}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageClick(page)}>
                <ListItemText primary={page.title} />
                {openPage === page ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openPage === page} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {page.subPages.map((subPage) => (
                  <ListItemButton
                    key={subPage.title}
                    component={Link}
                    href={subPage.url}
                    onClick={onClose}>
                      <ListItemIcon>{subPage.icon}</ListItemIcon>
                      <ListItemText primary={subPage.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default MenuBar;
