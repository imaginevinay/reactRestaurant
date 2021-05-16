import React from 'react';
import classes from './Modal.module.css';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';

const BackDrop = props => {
    return (
        <div className={classes.backdrop} onClick={props.onCloseCart}></div>
    )
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElem = document.getElementById('overlays')

const Modal = props => {
    return (
        /** without portals */
        // <Fragment>
        //     <Backdrop />
        //     <ModalOverlay>{props.children}</ModalOverlay>
        // </Fragment>

        /**with portals */
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onCloseCart={props.onCloseCart}/>, portalElem)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElem)}
        </Fragment>
    )
}

export default Modal
