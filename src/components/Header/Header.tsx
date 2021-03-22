import React, { useState } from "react";
import {
  Button,
  Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Nav,
  Navbar,
  NavItem,
} from "reactstrap";
import { ProductModal } from "../";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface Header {
  sortProducts?: any
  sortBy?: string
}

export const Header: React.FC<Header> = ({ sortProducts, sortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const [dropdownIsOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownIsOpen)
  }

  const onItemClick = (event: any) => {
    sortProducts(event.target.innerText);
  }

  return (
      <>
        <Navbar color="light" light expand="md" style={{ minHeight: '60px'}}>
          <Collapse navbar className="d-flex justify-content-between">
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/" >Home</Link>
              </NavItem>
            </Nav>

            {pathname === ROUTES.HOME && (
                <Dropdown isOpen={dropdownIsOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    { sortBy }
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Sort by: </DropdownItem>
                    <DropdownItem onClick={onItemClick}>Name</DropdownItem>
                    <DropdownItem onClick={onItemClick}>Amount</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            )}
            { pathname === ROUTES.HOME && (<Button color="success" onClick={toggleModal}>New product</Button>)}
          </Collapse>
        </Navbar>
        { pathname === ROUTES.HOME && (<ProductModal toggleModal={toggleModal} isOpen={isOpen} type="add"/>)}
      </>
  )
}
