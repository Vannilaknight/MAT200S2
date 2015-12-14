var File = React.createClass({
   render: function() {
       var file = this.props.file;
       return (
           <div className="demo-card-event mdl-card mdl-shadow--2dp">
               <div className="mdl-card__title mdl-card--expand">
                   <h4>
                       {file}
                   </h4>
               </div>
               <div className="mdl-card__actions mdl-card--border">
                   <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                       Download
                   </a>
                   <div className="mdl-layout-spacer"></div>
                   <i className="material-icons">description</i>
               </div>
           </div>
       );
   }
});

var Profile = React.createClass({
    getInitialState: function() {
        return {
            userFiles: [],
            fileElements: []
        }
    },
    componentDidMount: function() {
        $.get(this.props.fileSource, function(result) {
            if (this.isMounted()) {
                this.setState({
                    userFiles: result.files
                });

                this.buildFileElements(this.state.userFiles);
            }
        }.bind(this));
    },
    buildFileElements: function(files) {
        var fileElements = [];
        for(var i = 0; i < files.length; i++) {
            fileElements.push(
                <File key={i} file={files[i]} />
            )
        }

        this.setState({fileElements: fileElements});
    },
    render: function() {
       return (
           <div className="file-browser">
               <h1>Your Files</h1>
               <p>Browse through all your personal files here.</p>
               {this.state.fileElements}
           </div>
       );
    }
});

ReactDOM.render(<Profile fileSource="/jleininger/getFileList" />, document.getElementById('pageContent'));