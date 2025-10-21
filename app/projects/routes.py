from flask import Blueprint, render_template, request
import pandas as pd

projects = Blueprint("projects", __name__)

@projects.route("/portfolio")
def portfolio():
    return render_template("portfolio.html", title="Portfolio")

@projects.route("/tip_redistribution")
def tip_redistribution():
    return render_template("projects/tip_redistribution.html", title="Tip Redistribution")

@projects.route('/knife_grinder', methods=['GET'])
def knife_grinder():
    return render_template("projects/knife_grider.html", title="Knife Grinder")




@projects.route('/learn_something', methods=['GET'])
def learn_something():

    df = pd.read_csv('app/projects/assets/learn_something.csv')
    category_list = df['category'].unique()
    subcategory_list = df['subcategory'].unique()
    knowledge_level = df['experience'].unique()
    grouped = df.groupby(['category', 'subcategory'])

    data = {}
    for name, group in grouped:
        if name[0] not in data:
            data[name[0]] = {}
        data[name[0]][name[1]] = group[['experience', 'resource_type', 'resource_description', 'resource_link']].to_dict(orient='records')

    return render_template('projects/education.html', category_list=category_list, subcategory_list=subcategory_list, knowledge_level=knowledge_level, data=data, title="Learn Something New")



@projects.route("/periodic_table", methods=['GET'])
def periodic_table():
    df = pd.read_csv("app/projects/assets/periodic_table.csv")
    df['Element Type'].fillna("Unknown", inplace=True)
    df.columns = df.columns.str.lower()
    df.columns = df.columns.str.replace(' ', '_')
    column_list = df.columns.to_list()
    df['year_of_discovery'] = df['year_of_discovery'].fillna(0).astype(int)
    df['year_of_discovery'] = df['year_of_discovery'].replace(0, "unknown")


    element_type_list = df['element_type'].unique()
    phase_list = df['phase'].unique()
 
    unique_item_lists = {}
    for col in column_list:
        unique_items = df[col].unique()
        unique_item_lists[col] = unique_items


    dropdown_list = ['period', 'phase', 'element_type']
    not_displayed = ['display_row', 'display_column']
    in_square = ['atomic_weight', 'atomic_number','element','symbol']
    more_info_list = ['most_stable_crystal', 'isotopes', 'discoverer', 'year_of_discovery', 'electron_configuration']


    elements = df.to_dict('records')
    return render_template("projects/periodic_table.html", elements=elements, unique_item_lists=unique_item_lists, column_list=column_list, dropdown_list=dropdown_list, not_displayed=not_displayed, in_square=in_square, more_info_list=more_info_list, element_type_list=element_type_list, phase_list=phase_list, title="Periodic Table")


@projects.route('/update_selected_element', methods=['POST'])
def update_selected_element():
    df = pd.read_csv("portfolio/dash_application/data/periodic_table.csv")
    df['Element Type'].fillna("Unknown", inplace=True)
    df.columns = df.columns.str.lower()
    df.columns = df.columns.str.replace(' ', '_')

    element_name = request.json['elementName']
    filter_data = df['element'] == element_name
    selected_element = df[filter_data].to_dict()
    return selected_element


