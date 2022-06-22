Xvfb -ac :99 -screen 0 1280x1024x16 &
export DISPLAY=:99
cd /home/sum117/pontoMais;
sudo node /home/sum117/pontoMais/index.js;