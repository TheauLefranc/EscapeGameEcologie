import csv 

aquisition = {}
    
transfert = {}

with open('./public/data/transactions_EUTL_PUBLIC_NOTESD_20251031.csv', newline='', encoding='utf-8') as file :
    # Utiliser DictReader pour lire le CSV comme une liste de dictionnaires
    # Il utilise la virgule comme délimiteur par défaut.
    reader = csv.DictReader(file)
    
    # Convertir l'itérateur en liste
    data_list = list(reader)
    
    # Vous pouvez maintenant accéder à vos données
    # print(data_list[0]) # Affiche la première ligne de données (après l'en-tête)
    
    
    
    for row in data_list:
        if row['ACQUIRING_REGISTRY_NAME'] not in transfert :
            transfert[row['ACQUIRING_REGISTRY_NAME']] = int(row['AMOUNT'])
        else :
            transfert[row['ACQUIRING_REGISTRY_NAME']] += int(row['AMOUNT'])
            
    for row in data_list:
        if row['TRANSFERRING_REGISTRY_NAME'] not in aquisition :
            aquisition[row['TRANSFERRING_REGISTRY_NAME']] = int(row['AMOUNT'])
        else :
            aquisition[row['TRANSFERRING_REGISTRY_NAME']] += int(row['AMOUNT'])
            

aquisition_filename = './public/data/aquisition_summary.csv'
with open(aquisition_filename, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)

    writer.writerow(['TRANSFERRING_REGISTRY_NAME', 'TOTAL_AMOUNT'])

    for registry, amount in aquisition.items():
        writer.writerow([registry, amount])

print(f"Les données d'acquisition ont été sauvegardées dans {aquisition_filename}")


transfert_filename = './public/data/transfert_summary.csv'
with open(transfert_filename, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)

    writer.writerow(['ACQUIRING_REGISTRY_NAME', 'TOTAL_AMOUNT'])

    for registry, amount in transfert.items():
        writer.writerow([registry, amount])

print(f"Les données de transfert ont été sauvegardées dans {transfert_filename}")
