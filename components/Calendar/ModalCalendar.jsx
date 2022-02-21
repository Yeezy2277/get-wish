import React from "react";
import { Button, Modal, Center } from "native-base";
import {Calendar} from "../index";

const ModalCalendar = ({modalVisible, setModalVisible}) => {
    return (
        <Center>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} _backdrop={{
                _dark: {
                    bg: "#E5E5E5"
                },
                bg: "rgba(0,0,0,0.76)"
            }}>
                <Modal.Content width="320" height="357">
                    <Calendar/>
                </Modal.Content>
            </Modal>
        </Center>
    );
};

export default ModalCalendar;
