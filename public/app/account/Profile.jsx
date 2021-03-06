var SizeDisplay = React.createClass({
    render: function() {
        return (
            <div className="file-size-display">
                <div className="middle-container">
                    <p>You've used</p>
                    <h5>{this.props.totalSize}</h5>
                    <p>in file storage.</p>
                </div>
            </div>
        );
    }
});

var File = React.createClass({
    cleanFileName: function(file) {
        return file.substr(0, file.lastIndexOf('.')) || file;
    },
    deleteFile: function(path) {
        console.log(path);
        $.ajax({
            url: '/' + path,
            type: 'DELETE',
            dataType: 'json',
            complete: function(response) { console.log(response); window.location.reload(); }
        });
    },
    render: function() {
       var file = this.cleanFileName(this.props.file),
           fileDownloadPath = '/fileDownload/' + this.props.file;
       return (
           <div className="demo-card-event mdl-card mdl-shadow--2dp">

               <div className="mdl-card__title mdl-card--expand">
                   <h4>
                       {file}
                   </h4>
               </div>
               <div className="mdl-card__actions mdl-card--border">
                   <a href={fileDownloadPath} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                       Download
                   </a>
                   <div className="mdl-layout-spacer"></div>
                   <div className="mdl-button mdl-js-button mdl-button--icon delRight">
                       <i className="material-icons" onClick={this.deleteFile.bind(this, this.props.file)}>delete</i>
                   </div>
               </div>
           </div>
       );
    }
});

var Profile = React.createClass({
    getInitialState: function() {
        return {
            userFiles: [],
            totalUserStorage: '0 Mb',
            fileElements: []
        }
    },
    componentDidMount: function() {
        $.get(this.props.fileSource, function(result) {
            if (this.isMounted()) {
                this.setState({
                    userFiles: result.files,
                    totalUserStorage: result.size
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
           <div>
               <div className="file-browser">
                   <h1>Your Files</h1>
                   {this.state.fileElements}
               </div>
               <SizeDisplay totalSize={this.state.totalUserStorage} />
           </div>
       );
    }
});

ReactDOM.render(<Profile fileSource="/getFileList" />, document.getElementById('pageContent'));

