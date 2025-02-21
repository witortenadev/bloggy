'use client'
import React, { useState } from 'react'

function Create() {
    const [postBody, setPostBody] = useState("")
    return (
        <div className='px-2'>
            <form
                className='flex flex-col gap-4'
                action="">
                <input type="text" name="title" id="title" placeholder='Title' className='p-2 text-black' />
                <textarea name="" id="" cols="30" rows="10" placeholder='Body' onChange={(e) => setPostBody(e.target.value)} value={postBody} className='p-2 text-black'></textarea>
                <button className='border-2 border-gray-400 rounded-sm p-2 text-xl bg-slate-700 hover:border-gray-200'>Create</button>
            </form>
        </div>
    )
}

export default Create
