#imports
import discord
import logging
import aiohttp
import asyncio
import json
from discord.ext import commands, tasks

#define logging
logger = logging.getLogger('cases')

class cases(commands.Cog):
    #constructor [default values]
    def __init__(self, bot):
        self.bot = bot
        self.countries = []
        self.context = None
        self.notification_embed = None
        self.lock = asyncio.Lock()
        self.update_counter = 0
        self.update_countries.start()
        self.cur_page = 0

    #On ready event
    @commands.Cog.listener()
    async def on_ready(self):
        logger.info("Case Tracking Is Ready!")
        print("Case Tracking Is Ready!")

    #custom context to format the message 
    @commands.Cog.listener()
    async def on_message(self, message):
        self.context = message.channel
    #async task loop
    @tasks.loop(seconds=5.0)
    async def update_countries(self):
        async with self.lock:
            async with aiohttp.ClientSession() as session:
                old_confirmed = 0
                if len(self.countries) > 0:
                    for field in self.countries[self.cur_page].fields:
                        if field.name == "New Confirmed":
                            old_confirmed = eval(field.value)
                            break
                async with session.get('https://api.covid19api.com/summary') as r:
                    if r.status == 200:
                        js = await r.json()
                       
                        self.countries = []   
                        for country in js["Countries"]:
                            embed=discord.Embed(title=country["Country"], description="Data Analysis & Live Updates For Covid19")
                            embed.add_field(name="New Confirmed", value=country["NewConfirmed"], inline=True)
                            embed.add_field(name="Total Confirmed", value=country["TotalConfirmed"], inline=True)
                            embed.add_field(name="New Deaths", value=country["NewDeaths"], inline=True)
                            embed.add_field(name="Total Deaths", value=country["TotalDeaths"], inline=True)
                            embed.add_field(name="New Recovered", value=country["NewRecovered"], inline=True)
                            embed.add_field(name="Total Recovered", value=country["TotalRecovered"], inline=True)
                            embed.set_footer(text="Made by Mehul Arora (arorom18) | Nobita #3553")
    
                            
                            self.countries.append(embed)
                    else:
                        self.countries = []

                    self.update_counter += 1
                    if self.context is not None:
                        new_confirmed = 0
                        if len(self.countries) > 0:
                            for field in self.countries[self.cur_page].fields:
                                if field.name == "New Confirmed":
                                    new_confirmed = eval(field.value)
                                    break                       

                        if self.notification_embed is not None:
                            await self.notification_embed.edit(content=f"```Update Number: {self.update_counter} | Case Increase: {new_confirmed - old_confirmed} ```")
                        else:
                            self.notification_embed = await self.context.send(f"```Update Number: {self.update_counter}  | Case Increase: {new_confirmed - old_confirmed} ```")
                            
    #actual command
    @commands.command()
    async def casetrack(self, ctx):
        pages = len(self.countries)


        first_country = await ctx.send(embed = self.countries[self.cur_page])

        await first_country.add_reaction("◀️")
        await first_country.add_reaction("▶️")

        def check(reaction, user):
            return user == ctx.author and str(reaction.emoji) in ["◀️", "▶️"]


        while True:
            try:
                reaction, user = await self.bot.wait_for("reaction_add", check=check)

                async with self.lock:
                    if str(reaction.emoji) == "▶️" and self.cur_page != pages:
                        self.cur_page += 1
                        await first_country.edit(embed=self.countries[self.cur_page])
                        await first_country.remove_reaction(reaction, user)

                    elif str(reaction.emoji) == "◀️" and self.cur_page > 0:
                        self.cur_page -= 1
                        await first_country.edit(embed=self.countries[self.cur_page])
                        await first_country.remove_reaction(reaction, user)
                    else:
                        await first_country.remove_reaction(reaction, user)

            except asyncio.TimeoutError:
                await first_country.delete()
                break

def setup(bot):
    bot.add_cog(cases(bot))

