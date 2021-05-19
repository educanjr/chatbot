const axios = require('axios');

const config = require('../../../config/botConfig');
const { Op } = require('sequelize');
const models = require('../../../models');
const BotTracer = models.BotTracer;

const Commands = {
    timeat: '!timeat',
    timepopularity: '!timepopularity'
}

exports.evaluateBotCommands = (str) => {
    const arrCommand = str.split(' ');
    const strCommand = arrCommand[0];
    const params = arrCommand.length > 1 ? arrCommand.slice(1) : [];

    const arrCurrentCommands = Object.values(Commands);
    
    return arrCurrentCommands.includes(strCommand) 
        ? {command: strCommand, params} 
        : undefined;
}

exports.getBotResponse = async (command, params) => {
    try {
        switch(command) {
            case Commands.timeat: 
                return await timeAt(params);
            case Commands.timepopularity:
                return await timePopularity(params);
            default:
                return config.defaultResult;
        }
    } catch(err) {
        console.error('BOT RESPONSE ERROR', err.message);
        return config.defaultResult;
    }
}

const timeAt = async (params) => {
    const response = await getFromWorldTimeAPI(config.apiTimezone, params[0]);
    if(response && response.data && response.data.datetime) {
        return formatDate(response.data.datetime);
    }

    return config.defaultResult;
}

const timePopularity = async (paramsQuery) => {
    const findParam = `["${paramsQuery[0]}`;
    const messages = await BotTracer.findAndCountAll({
        where: {
            [Op.and]: [
                {
                    params: {
                        [Op.startsWith]: findParam
                    }
                },
                {
                    command: Commands.timeat
                }
            ]
        }
    });

    return messages.count.toString();
}

const getFromWorldTimeAPI = async (method, additionalParams) => {
    try{
        const requestUrl = `${config.platformURL}/${method}/${additionalParams}`;
        const response = await axios.get(requestUrl);
        return response;
    } catch(err) {
        console.error('GET FROMWORLD API ERROR', err.message);
    }

    return null;    
}

const formatDate = (strDate) => {
    var d = new Date(strDate);
    var date_format_str = (d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+months[d.getMonth()]+" "+d.getFullYear().toString()+"  "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());

    return date_format_str;
}

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DIC']; 