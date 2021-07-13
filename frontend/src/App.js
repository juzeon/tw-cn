import logo from './logo.svg'
import './App.css'
import React from "react"
import {Grid, TextField, Card, CardContent, Typography, Box, ButtonGroup, Snackbar} from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert'
import {InputBox} from "./InputBox"
import {OptionSelector} from "./OptionSelector"
import {ButtonLine} from "./ButtonLine"
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL=process.env.API_BASE_URL

export class App extends React.Component {
    constructor() {
        super();
        this.state={
            alertOpen:false,
            text:'',
            writing:localStorage.getItem('trans-writing') || 0,
            speaking:localStorage.getItem('trans-speaking') || 0
        }
    }
    onCopy(){
        navigator.clipboard.writeText(this.state.text)
        this.setState({
            alertOpen:true
        })
    }
    async onPaste(){
        if(navigator.clipboard.readText) {
            let text = await navigator.clipboard.readText()
            this.setState({
                text: text
            })
        }
    }
    async onTrans(){
        let resp=axios.post('/trans?'+qs.stringify({
            writing:this.state.writing,
            speaking:this.state.speaking
        }),qs.stringify({
            text:this.state.text
        }))
        this.setState({
            text:(await resp).data.text
        })
    }
    onTextChange(text){
        this.setState({
            text:text
        })
    }
    onWritingIndexChange(index){
        localStorage.setItem('trans-writing',index)
        this.setState({
            writing:index
        })
    }
    onSpeakingIndexChange(index){
        localStorage.setItem('trans-speaking',index)
        this.setState({
            speaking:index
        })
    }
    render() {
        return (
            <Box mt={2}>
                <Grid container justify={"center"}>
                    <Grid container item xs={12} sm={6}>
                        <Box width={1}>
                            <Card>
                                <CardContent>
                                    <Typography variant={'h5'}>正体-简体线上转换</Typography>
                                    <InputBox text={this.state.text} onTextChange={this.onTextChange.bind(this)}/>
                                    <OptionSelector onChange={this.onWritingIndexChange.bind(this)}
                                                    index={this.state.writing}
                                                    description={'请选择书写字符：'} options={['繁体', '简体']}/>
                                    <OptionSelector onChange={this.onSpeakingIndexChange.bind(this)}
                                                    index={this.state.speaking}
                                                    description={'请选择用语习惯：'} options={['台湾', '大陆']}/>
                                    <ButtonLine onPaste={this.onPaste.bind(this)}
                                                onCopy={this.onCopy.bind(this)}
                                                onTrans={this.onTrans.bind(this)}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
                <Snackbar autoHideDuration={1000} open={this.state.alertOpen} onClose={()=>{this.setState({alertOpen:false})}}>
                    <MuiAlert elevation={6} variant={"filled"} severity={"success"}>已复制到剪切板</MuiAlert>
                </Snackbar>
            </Box>
        )
    }
}
