#imports 
import discord
from discord.ext import commands
import os
import logging
import configparser
import asyncio
import aiohttp
from discord.ext.commands.bot import when_mentioned_or

#Configurations
config = configparser.ConfigParser()
config.read('config.ini')
TOKEN = config['MAIN']['Token']
PREFIX = config['MAIN']['Prefix']


#Define logger
log = logging.getLogger(__name__)

#instance 
class hackage(commands.Bot):
    def __init__(self):
        super().__init__(command_prefix=when_mentioned_or(PREFIX), description= "MEC Covid19 Tracking Project!")
        self.load_cogs()
#load command files 
    def load_cogs(self):
        for filename in os.listdir('./cogs'):
            try:
                if filename.endswith('.py'):
                    self.load_extension(f'cogs.{filename[:-3]}')
                    log.info(f'{filename} cogs loaded')
            except Exception:
                log.exception(f'{filename} failed to load cogs')
#unload command files 
    def unload_cogs(self):
        for filename in os.listdir('./cogs'):
            try:
                if filename.endswith('.py'):
                    self.load_extension(f'cogs.{filename[:-3]}')
                    log.info(f'{filename} cogs unloaded')
            except Exception:
                log.exception(f'{filename} failed to unload cogs')


if __name__ == '__main__':
    bot = hackage()
    bot.run(TOKEN)
    
