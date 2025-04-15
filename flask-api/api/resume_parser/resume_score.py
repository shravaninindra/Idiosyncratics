from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
from nltk.corpus import wordnet
import numpy as np

def get_wordnet_pos(word):    
    tag = pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ,
                "N": wordnet.NOUN,
                "V": wordnet.VERB,
                "R": wordnet.ADV}
    return tag_dict.get(tag, wordnet.NOUN)

def stemmed_words(doc):
    lemmatizer = WordNetLemmatizer()
    analyzer = CountVectorizer().build_analyzer()
    return (lemmatizer.lemmatize(w,get_wordnet_pos(w)) for w in analyzer(doc) if w not in set(stopwords.words('english')))        
   

def get_tf_idf_cosine_similarity(job_desc,resume):    
    tf_idf_vect = TfidfVectorizer(analyzer=stemmed_words)
    tf_idf_desc_vector = tf_idf_vect.fit_transform([job_desc]).todense()
    tf_idf_resume_vector = tf_idf_vect.transform([resume]).todense()
    tf_idf_cosine_similarity = cosine_similarity(np.asarray(tf_idf_desc_vector),np.asarray(tf_idf_resume_vector))
    score = tf_idf_cosine_similarity[0][0]*100
    if score > 100:
        score = 100
    if score < 0:
        score = 0
    return score



def get_analysis(resume_dict,job_dict):
    score_dict = {
        'skill_score' : None,
        'name_exists' : 0,
        'email_exists': 0,
        'mobile_exists': 0,
        'website_exists': 0,
        'word_count': None,
        'skill_count': None,
        'education_exists': None,
        'experience_exists': None,
        'page_count': None
    }

    resume_skills_text = ' '.join(resume_dict['skills'])
    job_desc_skills_text = ' '.join(job_dict['skills'])
    score_dict['skill_score'] = get_tf_idf_cosine_similarity(job_desc_skills_text, resume_skills_text)
    if resume_dict['name'] != None:
        score_dict['name_exists'] = 1

    if resume_dict['email'] != None:
        score_dict['email_exists'] = 1

    if resume_dict['mobile_number'] != None:
        score_dict['mobile_exists'] = 1

    if resume_dict['website'] != None:
        score_dict['website_exists'] = 1

    score_dict['page_count'] = resume_dict['page_count']
    score_dict['word_count'] = resume_dict['word_count']
    return score_dict