import { addDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, db } from "../firebase";
import { collection } from "firebase/firestore";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
//<form> gathers every inputs in there and submitting them is possible, but <div> can't submit
//display flex is arranging in a row
//flex-direction: column makes row behavior to column behavior

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder{
        font-size: 16px;
    }
    &:focus{
        outline: none;
        border-color: skyblue;
    }
`;
//<textarea>: multiple lines vs <input type="text">: single line
// textarea has resizing function by a default

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: skyblue;
    text-align: center;
    border-radius: 20px;
    border: 1px solid skyblue;
    font-size: 14px;
    font-weight: 600px;
    cursor:pointer;
`;

const AttachFileInput = styled.input`
    display: none;
`;
//<input type="submit"> vs <button>

const SubmitBtn = styled.input`
    background-color: skyblue;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor:pointer;
    &:hover,
    &:active{
        opacity: 0.9;
    }
`;

export default function PostTweetForm(){
    const [isLoading, setLoading] = useState(false);
    const [tweet,setTweet] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    }
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files && files.length ===1){
            setFile(files[0]);
        }
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser
        if(!user || isLoading || tweet === "" || tweet.length>180)return;
        try {
            setLoading(true);
            await addDoc(collection(db, "tweets"),{
                tweet,
                createdAt: Date.now(),
                user: user.displayName || "Anonymous",
                userID: user.uid
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return <Form onSubmit={onSubmit}>
        <TextArea 
        value={tweet} 
        onChange={onChange}
        placeholder="What is happening?" 
        rows={5}
        maxLength={180}
        />
        <AttachFileButton htmlFor="file">{file? "Photo added" : "Add photo"}</AttachFileButton>
        <AttachFileInput 
            onChange={onFileChange}
            type= "file" 
            id="file" 
            accept="image/*" 
        />
        {/* if label's htmlFor and input's id are connected, so they have same id, that one is clicked is same for another */}
        <SubmitBtn type="submit" value={isLoading? "Posting..." : "post-tweet"} />
    </Form>
}