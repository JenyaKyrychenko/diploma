var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

const loadDocument = (fileName, inputData, userEmail) => {
    function replaceErrors(key, value) {
        if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                error[key] = value[key];
                return error;
            }, {});
        }
        return value;
    }

    function errorHandler(error) {
        console.log(JSON.stringify({error: error}, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
    }

//Load the docx file as a binary
    var content = fs
        .readFileSync(path.resolve('./FileTemplates/', `${fileName}.docx`), 'binary');

    var zip = new PizZip(content);
    var doc;
    try {
        doc = new Docxtemplater(zip);
    } catch(error) {
        // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
        errorHandler(error);
    }

    switch (fileName) {
        case 'researchwork' : {
            doc.setData({
                name: inputData.name,
                text: inputData.text
            });
            break
        }
        case 'declaration': {
            doc.setData({
                name: inputData.name,
                surname: inputData.surname,
                nationality: inputData.nationality,
                passportId: inputData.passportId,
                birthday: inputData.birthday,
                gender: inputData.gender,
                schoolGraduateDate: inputData.schoolGraduateDate,
                address: inputData.address,
                phoneNumber: inputData.phoneNumber,
                email: inputData.email,
                language: inputData.language
            });
            break
        }
        defaulf:{
            throw new Error('Щось пішло не так!')
            break
        }
    }

    try {
        doc.render()
    }
    catch (error) {
        errorHandler(error);
    }

    var buf = doc.getZip()
        .generate({type: 'nodebuffer'});

    fs.writeFileSync(path.resolve('./CompletedFiles/', `${fileName}_${userEmail}.docx`), buf);
    // return buf
}

module.exports = loadDocument