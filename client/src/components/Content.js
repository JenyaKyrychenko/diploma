import React from 'react'

export const Content = () => {
    return (
        <div className="container-fluid">
            <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">Спеціальність:</label>
                    <select className="form-select" id="validationCustom04" required>
                        <option selected disabled value="">Спеціальність...</option>
                        <option>121</option>
                        <option>122</option>
                    </select>
                </div>
            </form>
        </div>

    )
}