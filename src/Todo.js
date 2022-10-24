import React from 'react';
import { FormControl, Modal, List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import db from './Firebase';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/base/TextareaAutosize';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};



function Todo(props) {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState();
    const handleClose = () => setOpen(false);
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });
        setOpen(false);
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit your TODO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormControl>
                            <TextareaAutosize style={{ width: 200, fontSize: 15 }} minRows={3} value={input} placeholder={props.todo.todo} onChange={event => setInput(event.target.value)} />

                            <Button onClick={updateTodo} variant="contained" sx={{ mt: 2 }} color="success">
                                Update
                            </Button>
                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
            <List className='todo_list' sx={{ ml: 30, mr: 30}}>
                <ListItem>
                    <ListItemText primary={props.todo.todo} secondary={props.todo.time} />
                
                <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()} variant="contained" color="error">
                    <DeleteForeverIcon /> </Button>

                <Button onClick={event => setOpen(true)} variant="contained" color="secondary" sx={{ ml: 2 }}>
                    <EditIcon />
                </Button>
                </ListItem>
            </List>

        </>
    );
}

export default Todo;