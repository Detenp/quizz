import {ChangeEvent, FormEvent, useRef, useState} from "react";

export default function CreateGameModal({ show, handleClose, formOutput }) {
    const [formData , setFormData] = useState({
        username: '',
        gameName: ''
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        event.stopPropagation()

        formOutput(formData)
    }

    return (
        <>
            <div className={`modal fade ${show ? 'show d-block' : ''}`} id="exampleModal" tabIndex={-1} role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className={"input-group mb-3"}>
                                    <input
                                        className={"form-control"}
                                        name={"username"}
                                        type={"text"}
                                        placeholder={"Username"}
                                        aria-label={"Username"}
                                        maxLength={25}
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className={"form-control"}
                                        name={"gameName"}
                                        type={"text"}
                                        placeholder={"GamePage Name"}
                                        aria-label={"GamePage Name"}
                                        maxLength={25}
                                        value={formData.gameName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                <input type="submit" className="btn btn-primary" value={"Save changes"}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
