import {ChangeEvent, FormEvent, useState} from "react";

export default function CreateGameModal({ show, handleClose, formOutput }) {
    const [formData , setFormData] = useState({
        username: '',
        gameName: ''
    })

    const [isFormValid, setFormValid] = useState(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        setFormValid(formData.gameName.match(/^ *$/) === null || formData.username.match(/^ *$/) === null)
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
                        <div className="modal-header justify-content-center">
                            <h3 className="modal-title" id="exampleModalLabel">Create a game</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className={"form-group"}>
                                    <input
                                        className={"form-control"}
                                        name={"username"}
                                        type={"text"}
                                        placeholder={"Username"}
                                        aria-label={"Username"}
                                        maxLength={25}
                                        value={formData.username}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                <div className="mt-2">
                                    <input
                                        className={"form-control"}
                                        name={"gameName"}
                                        type={"text"}
                                        placeholder={"Game Name"}
                                        aria-label={"Game Name"}
                                        maxLength={25}
                                        value={formData.gameName}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                <input type="submit" className={`btn btn-primary ${!isFormValid ? "disabled" : ""}`} value={"Save changes"}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
