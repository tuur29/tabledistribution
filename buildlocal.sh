
# Angular build
rm -rf dist
ng build -prod --base-href "./"
sed -i -e 's#<base href=\".\/\">#<script>document.write(`<base href="${document.location}" \/>`)<\/script>#g' dist/index.html

# <base href="./">
# <script>document.write(`<base href="${document.location}" />`)</script>

echo -e "\n\n Built!\n"
