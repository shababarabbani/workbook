const moment = require('moment')

module.exports = {
    formatDate: function (date, format){
        return moment(date).format(format)
    },   
    truncate: function (str, len) {
        if(str.length > len && str.length > 0){
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    editIcon: function (experienceUser, loggedUser, experienceId, floating = true) {
        if(experienceUser._id.toString() == loggedUser._id.toString()) {
            if(floating){
                return `<a href="/experiences/edit/${experienceId}" class="btn-floating halfway-fab blue"><i class="fas fa-light fa-edit fa-small"></i></a>`
            }
            else{
                return `<a href="/experiences/edit/${experienceId}"><i class="fas fa-edit"></i></a>`
            }
        }
        else{
            return ''
        }
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    select: function(selected, options){
        return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )

        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )
    }
}
