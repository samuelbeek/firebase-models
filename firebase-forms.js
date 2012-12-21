/*!
 * Forms for Models for Firebase
 * Version 1.0.0
 *
 * 2012, Volodymyr Sergeyev
 * VULCAN labs
 */

(function(){
    var FirebaseForms = {};

    /* ---- FIELDS --------------------------------------------------------- */

    /* Base Field */
    FirebaseForms.Field = {
        // params
        label: "",
        field: "",
        required: "",
        initial: "",

        render: function () {
            // Renders html form input
        }
    };

    FirebaseForms.TextField = function (params) {
        var f = {};

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                return '<label>'+this.label+'</label><input type="text" name="'+this.field+'" id="id_'+this.field+'" placeholder="'+this.label+'" '+this.required+' value="'+this.initial+'" />';
            }
        });

        return f;
    };

    FirebaseForms.DateField = function (params) {
        // params is {} with any of `label, field, required, initial`
        var f = {};

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                return '<label>'+this.label+'</label><input type="date" name="'+this.field+'" id="id_'+this.field+'" '+this.required+' value="'+this.initial+'" />';
            }
        });

        return f;
    };

    FirebaseForms.BigTextField = function (params) {
        var f = {};

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                return '<label>'+this.label+'</label><textarea name="'+this.field+'" id="id_'+this.field+'" placeholder="'+this.label+'" '+this.required+'>'+this.initial+'</textarea>';
            }
        });

        return f;
    };

    /* ---- FORMS ---------------------------------------------------------- */

    FirebaseForms.Form = function (params) {
        // params is {fields: {}, onSave: function}
        var f = {};

        $.extend(f, params, {
            render: function (item) {
                var res = '<form action="" method="post">';

                // in case we edit item
                if (item) {
                    res += '<input type="hidden" name="id" id="id_id" value="' + item.id + '" />';
                }

                $.each(this.fields, function (k, v) {
                    // If we edit item - assign initial value for field
                    v.initial = "";
                    if (item && item.hasOwnProperty(v.field))
                        v.initial = item[v.field];
                    // Render field as a piece of html
                    res += "<p>" + v.render() + "</p>";
                });

                res += '<input type="submit" class="btn btn-primary" value="Submit" />';
                res += '</form>';
                return res;
            }
        });

        return f;
    };

    this.FirebaseForms = FirebaseForms;
}).call(this);