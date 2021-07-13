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

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

export class App extends React.Component {
    constructor() {
        super()
        this.state = {
            successAlertOpen: false,
            errorAlertOpen: false,
            successAlertText: '',
            text: '',
            writing: localStorage.getItem('trans-writing') || 0,
            speaking: localStorage.getItem('trans-speaking') || 0
        }
    }

    onCopy() {
        navigator.clipboard.writeText(this.state.text)
        this.setState({
            successAlertText: '已复制到剪贴板',
            successAlertOpen: true
        })
    }

    async onPaste() {
        if (navigator.clipboard.readText) {
            let text = await navigator.clipboard.readText()
            this.setState({
                successAlertText: '已从剪贴板读取',
                successAlertOpen: true,
                text: text
            })
        } else {
            this.setState({
                errorAlertOpen: true
            })
        }
    }

    async onTrans() {
        let resp = axios.post('/trans?' + qs.stringify({
            writing: this.state.writing,
            speaking: this.state.speaking
        }), qs.stringify({
            text: this.state.text
        }))
        this.setState({
            text: (await resp).data.text
        })
    }

    onTextChange(text) {
        this.setState({
            text: text
        })
    }

    onWritingIndexChange(index) {
        localStorage.setItem('trans-writing', index)
        this.setState({
            writing: index
        })
    }

    onSpeakingIndexChange(index) {
        localStorage.setItem('trans-speaking', index)
        this.setState({
            speaking: index
        })
    }

    render() {
        return (
            <Box mt={2} mx={1}>
                <Grid container justify={"center"}>
                    <Grid container item xs={12} sm={6}>
                        <Box width={1}>
                            <Card>
                                <CardContent>
                                    <Typography variant={'h5'}>繁体-简体线上转换</Typography>
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
                <Snackbar autoHideDuration={1000} open={this.state.successAlertOpen} onClose={() => {
                    this.setState({successAlertOpen: false})
                }}>
                    <MuiAlert elevation={6} variant={"filled"}
                              severity={"success"}>{this.state.successAlertText}</MuiAlert>
                </Snackbar>
                <Snackbar autoHideDuration={1000} open={this.state.errorAlertOpen} onClose={() => {
                    this.setState({errorAlertOpen: false})
                }}>
                    <MuiAlert elevation={6} variant={"filled"} severity={"error"}>您的浏览器不支援读取剪贴板</MuiAlert>
                </Snackbar>
            </Box>
        )
    }
}
