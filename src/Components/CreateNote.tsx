import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Form, Alert } from 'react-bootstrap'
import { Note } from '../Models/NoteModel'

type Props = {
    notes: Note[],
    setnotes: React.Dispatch<React.SetStateAction<Note[]>>
}

export const CreateNote = ({notes, setnotes}: Props) => {
    const [error, setError] = useState<string>("");
    const titleRef = useRef<HTMLInputElement | null>(null);
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const ColorRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
        if (titleRef.current?.value === "" || textRef.current?.value === "") {
            return setError("All fields are required")
        }
        setError("");
        setnotes([...notes, {
            id: (new Date()).toString(),
            title: (titleRef.current as HTMLInputElement).value,
            text: (textRef.current as HTMLTextAreaElement).value,
            color: (ColorRef.current as HTMLInputElement).value,
            date: (new Date()).toString()
        }]);
        (titleRef.current as HTMLInputElement).value = "";
        (textRef.current as HTMLTextAreaElement).value = "";
    }
  return (
    <div>
        <h2>Create Note</h2>
        <Form className='mt-3 mb-3' onSubmit={(e) => handleSubmit(e)}>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form.Group className='mb-3' controlId='formBasicTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' placeholder='Enter title for the note' ref={ titleRef }/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
                <Form.Label>Text</Form.Label>
                <Form.Control placeholder='Enter Your note' as="textarea" rows={3} ref={ textRef }/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor='colorInput'>Notes color</Form.Label>
                <Form.Control type='color' id='colorInput' defaultValue="#dfdfdf" title='Choose your color' ref={ColorRef} />
            </Form.Group>
            <Button type="submit" variant='primary'> Submit</Button>
        </Form>
    </div>
  )
}