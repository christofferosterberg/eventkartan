
function Search() {
    return (
        <div className="mb-2">
            <h2 className='text-center'>Vad vill du göra idag?</h2>
            <div className="input-group mb-2">
                <input type="text" className="form-control" placeholder="Sök event" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Sök</button>
                </div>
            </div>
            <div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">Quiz</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"></input>
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Sport</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"></input>
                    <label className="form-check-label" htmlFor="inlineCheckbox3">Musik</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4"></input>
                    <label className="form-check-label" htmlFor="inlineCheckbox4">Fest</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4"></input>
                    <label className="form-check-label" htmlFor="inlineCheckbox4">Smakupplevelse</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4"></input>
                    <label className="form-check-label" htmlFor="inlineCheckbox4">Standup</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4"></input>
                    <label className="form-check-label" htmlFor="inlineCheckbox4">Övrigt</label>
                </div>
            </div>
        </div>
    )
}

export default Search