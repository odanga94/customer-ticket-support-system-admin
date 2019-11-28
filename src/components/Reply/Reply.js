import React from 'react';

import './Reply.css'

const reply = (props) => (
        <div className="Reply">
            <h3 style={{textAlign: "left", color: "#505050"}}>{"created on " + props.reply.dateCreated + ", by " + props.reply.author}</h3>
            <h2><span style={{color: "#505050", fontSize: 16}}>Title: </span>{props.reply.title}</h2>
            <p><span style={{color: "#505050", fontSize: 16, fontWeight: "bold"}}>Content: </span>{props.reply.body}</p>
        </div>

);

export default reply;