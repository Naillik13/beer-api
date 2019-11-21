beer-api
===

## Endpoints :

### Front
**Get**

Les bières - "/beers"

Parameters: 
- name: String
- minAbv: Int
- maxAbv: Int

Une bière - "/beers/{id}"

Les établissements - "/places"

Un établissements - "/places/{id}"

### Back
**Post**

Nouvel établissement - "/places"

Nouvelle bière - "/beers"

**Put**

Editer un établissement - "/places/{id}"

Editer une bière - "/beers/{id}"

**Delete**

Supprimer un établissement - "/places/{id}"

Supprimer une bière - "/beers/{id}"


