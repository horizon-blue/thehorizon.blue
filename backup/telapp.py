import sys
import os
import time
import telepot
import subprocess
import numpy as np
import matplotlib
matplotlib.use('Agg') # silent warning
import matplotlib.pyplot as plt
from math import *
import scipy as sp
import pandas as pd
import numpy.linalg as la
import sympy as syp
import qrcode

jup_process = None

help_info = '''/sayhi - Say Hi
/owo - 嗯。
/jupyter - 运行Jupyter Notebook（单人模式）
/shutdown - 终止正在进行中的Jupyter Notebook
/echo - 复读
/eval - 调用Python进行运算
/latex - 将LaTeX转为图片
/qr - 将文本内容转为二维码'''

def handle(msg):
    content_type, chat_type, chat_id = telepot.glance(msg)
    print(content_type, chat_type, chat_id)
    
    # print(chat_id)
    # print(msg)
    global jup_process
    if content_type == 'text':
        text = msg[content_type]
        if text[0] == '/':
            if text[:6] == '/sayhi':
                bot.sendMessage(chat_id, '嗨~')
            elif text[:4] == '/owo':
                bot.sendMessage(chat_id, '嗯。')
            elif text[:8] == '/jupyter':
                if jup_process is not None:
                    bot.sendMessage(chat_id, "Jupyter Notebook已在运行\n"
                            "地址: https://thehorizon.blue:8888")
                    return
                try:
                    jup_process = subprocess.Popen(['jupyter', 'notebook', '-y']) 
                    bot.sendMessage(chat_id, "Jupyter Notebook已启动\n"
                            "地址: https://thehorizon.blue:8888")
                except:
                    bot.sendMessage(chat_id, "启动失败。")
                    return
            elif text[:9] == '/shutdown':
                if jup_process is None:
                    bot.sendMessage(chat_id, "没有正在运行的notebook")
                else:
                    # jup_process.terminate() # twice to ignore confirmation
                    # jup_process.wait()
                    os.system('kill $(pgrep jupyter)')
                    jup_process = None
                    bot.sendMessage(chat_id, "notebook已关闭")
            elif text[:5] == '/echo':
                bot.sendMessage(chat_id, text[5:].lstrip())
            elif text[:5] == '/eval':
                retval = eval(text[5:].lstrip())
                if type(retval) == list and len(retval) >= 1 and type(retval[0]) == matplotlib.lines.Line2D:
                    plt.savefig('tmp/foo.png')
                    plt.figure()
                    img = open('tmp/foo.png', 'rb')
                    bot.sendPhoto(chat_id, img)
                    img.close()
                    return
                bot.sendMessage(chat_id, str(retval))
            elif text[:6] == '/latex':
                syp.preview('$$\\text{' + text[6:].lstrip() + '}$$', viewer='file', filename='tmp/foo.png', euler=False)
                img = open('tmp/foo.png', 'rb')
                bot.sendPhoto(chat_id, img)
                img.close()
            elif text[:5] == '/help':
                bot.sendMessage(chat_id, help_info)
            elif text[:3] == '/qr':
                qr = qrcode.QRCode(
                        version=1,
                        error_correction=qrcode.constants.ERROR_CORRECT_L,
                        box_size=10,
                        border=4,
                    )
                qr.add_data(text[3:].lstrip())
                qr.make(fit=True)

                img = qr.make_image()
                img.save("tmp/foo.png")
                img = open('tmp/foo.png', 'rb')
                bot.sendPhoto(chat_id, img)
                img.close()
            return
        bot.sendMessage(-210985506, text)
        bot.sendMessage(chat_id, "收到。")
        return

    bot.forwardMessage(-210985506, chat_id, msg['message_id'])
    bot.sendMessage(chat_id, "收到。")


token = '362664301:AAEra-13DyL6WUrfhrldNaUmmjRb7EjeWBg'  # get token from command-line

bot = telepot.Bot(token)
bot.message_loop(handle)
print ('Listening ...')

# Keep the program running.
while 1:
    time.sleep(10)
